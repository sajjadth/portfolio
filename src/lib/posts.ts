export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'why-go-for-backend',
    title: 'Why Go Became My Go-To Backend Language',
    date: '2025-08-10',
    tags: ['Go', 'Backend', 'Engineering'],
    excerpt: 'After years of writing JavaScript and TypeScript, switching to Go felt like trading a Swiss Army knife for a scalpel — precise, fast, and brutally effective. Here is why.',
    content: `<h2>The JavaScript Fatigue Was Real</h2>
<p>Like many developers who started their journey with JavaScript, I found myself constantly juggling frameworks, build tools, and runtime configurations. Every project seemed to require a new set of dependencies, and the cognitive load of keeping up with the ecosystem was exhausting. I loved the language, but I started questioning whether it was always the right tool for the job — especially for backend services where performance, concurrency, and deployment simplicity matter most.</p>

<h2>First Impressions: Less Is More</h2>
<p>The first thing that struck me about Go was its <strong>simplicity</strong>. The entire language specification fits in a few pages. There are no classes, no inheritance, no generics chaos (well, until recently), and no magic. A Go function does exactly what it says — nothing more, nothing less. Coming from TypeScript, where I had to mentally track type erasure, decorator behavior, and module resolution strategies, writing Go felt like a breath of fresh air.</p>

<pre>// A simple HTTP server in Go — that's it
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello from Go!")
    })
    http.ListenAndServe(":8080", nil)
}</pre>

<p>Compare that to the boilerplate required for even a basic Express or Fastify server, and you start to see the appeal. No <code>node_modules</code> folder with thousands of dependencies. No <code>tsconfig.json</code> to argue with. Just a single binary at the end.</p>

<h2>Concurrency Without the Headache</h2>
<p>Go's goroutines and channels are not just syntactic sugar — they represent a fundamentally different approach to concurrency. In JavaScript, async/await is great for I/O-bound operations, but it falls short when you need true parallelism. Go's goroutines are lightweight (starting at only a few KB of stack space), and the scheduler handles multiplexing them onto OS threads automatically.</p>

<pre>// Fetch multiple APIs concurrently
func fetchAll(urls []string) []Result {
    var wg sync.WaitGroup
    results := make([]Result, len(urls))

    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()
            results[idx] = fetch(u)
        }(i, url)
    }
    wg.Wait()
    return results
}</pre>

<p>This pattern — fire off goroutines, wait for completion, collect results — becomes second nature quickly. And it scales beautifully. I have run services handling thousands of concurrent connections on modest hardware without breaking a sweat.</p>

<h2>Deployment: A Single Binary Changes Everything</h2>
<p>As someone who also does DevOps work, this is perhaps my favorite part. Go compiles to a <strong>static binary</strong>. No runtime to install, no version conflicts, no container images weighing hundreds of megabytes. Copy the binary, set the execute permission, and you are done.</p>

<ul>
<li><strong>Docker images:</strong> From ~800MB (Node.js) to ~15MB (Go scratch)</li>
<li><strong>Cold starts:</strong> Near-instant compared to JVM or interpreted languages</li>
<li><strong>Memory footprint:</strong> Typically 10-50MB for production services</li>
<li><strong>Cross-compilation:</strong> Build for Linux from macOS with <code>GOOS=linux go build</code></li>
</ul>

<h2>The Trade-offs</h2>
<p>Go is not perfect. Error handling can feel verbose. The lack of sum types makes certain patterns awkward. Generics, while now available, are still limited compared to TypeScript's type system. And for front-end development, it is obviously not the right choice.</p>

<p>But for backend services — APIs, microservices, CLI tools, data pipelines — Go has become my default choice. It lets me focus on solving the actual problem instead of fighting the tooling.</p>

<h2>Final Thoughts</h2>
<p>I still write TypeScript daily for full-stack work, and I appreciate it deeply. But when a backend service needs to be fast, reliable, and easy to deploy, I reach for Go without hesitation. The best tool is the one that lets you ship with confidence — and Go gives me exactly that.</p>`,
  },
  {
    slug: 'linux-server-security',
    title: 'Hardening a Linux Server: My Checklist After 50+ Deployments',
    date: '2025-07-22',
    tags: ['Linux', 'DevOps', 'Security'],
    excerpt: 'After deploying and managing dozens of Linux servers, I have distilled my security hardening process into a repeatable checklist. These are the steps I never skip.',
    content: `<h2>Why Hardening Matters</h2>
<p>Every server connected to the internet is probed within minutes of coming online. Automated bots scan for open SSH ports, weak passwords, and known vulnerabilities constantly. In my early days, I learned this the hard way — a server I deployed for a personal project was compromised within 48 hours because I left the default SSH configuration intact.</p>

<p>Since then, I have developed a checklist that I run on every new server before it sees any real traffic. Here is the distilled version.</p>

<h2>Step 1: SSH First</h2>
<p>SSH is the most attacked service on any Linux server. The first thing I do is change the default port, disable root login, and set up key-based authentication only.</p>

<pre># Disable password auth
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Change port (pick something obscure)
echo "Port 48291" >> /etc/ssh/sshd_config
systemctl restart sshd</pre>

<p>I also create a non-root user with sudo access for daily operations. The root account should never be used for anything other than absolute emergencies.</p>

<h2>Step 2: Firewall Setup</h2>
<p>Every server should have a firewall that denies everything by default and only allows the specific ports you need. I use UFW for simplicity on Ubuntu/Debian systems.</p>

<pre>ufw default deny incoming
ufw default allow outgoing
ufw allow 48291/tcp   # SSH (custom port)
ufw allow 80/tcp      # HTTP
ufw allow 443/tcp     # HTTPS
ufw enable</pre>

<p>The key principle: if a port is not explicitly allowed, it should be blocked. No exceptions.</p>

<h2>Step 3: Automatic Updates</h2>
<p>Unpatched systems are the most common attack vector. I set up unattended-upgrades for security patches and configure a weekly cron job for full system updates.</p>

<h2>Step 4: Fail2Ban and Monitoring</h2>
<p>Fail2Ban monitors log files for suspicious activity and automatically bans IP addresses that show malicious signs — too many failed logins, port scanning, etc. Combined with a simple monitoring setup, you get decent protection without paying for enterprise tools.</p>

<h2>The Human Factor</h2>
<p>Tools and checklists are important, but the biggest security risk is always human error. I keep a documented runbook for every server, use infrastructure-as-code where possible, and never make manual changes in production without recording them. Automation is not just about efficiency — it is about eliminating the class of mistakes that come from tired humans typing commands at 2 AM.</p>`,
  },
  {
    slug: 'docker-ci-cd-pipeline',
    title: 'Building a CI/CD Pipeline That Actually Works',
    date: '2025-06-15',
    tags: ['Docker', 'CI/CD', 'DevOps'],
    excerpt: 'Most CI/CD tutorials show you the happy path. Here is what I have learned from building real pipelines — the parts that break, the parts that matter, and the parts nobody talks about.',
    content: `<h2>Beyond the Hello World Pipeline</h2>
<p>Every CI/CD tutorial starts the same way: push code, run tests, build image, deploy. It looks simple in a five-minute demo. But in practice, pipelines fail in ways that tutorials never prepare you for. Flaky tests, credential rotation, database migrations, rollback strategies — these are the real problems.</p>

<h2>The Architecture I Default To</h2>
<p>After building pipelines for projects of various sizes, I have settled on a pattern that works reliably:</p>

<pre>┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│  Push    │──▶│  Lint &  │──▶│  Build   │──▶│  Deploy  │
│  to main │    │  Test    │    │  Image   │    │  Stage   │
└────────┘    └────────┘    └────────┘    └────────┘
                                                  │
                                              ┌──▼──┐
                                              │Manual │
                                              │Promote│
                                              │ to    │
                                              │Prod   │
                                              └───────┘</pre>

<p>The key insight: separate staging and production deploys with a manual approval gate. Automated deploys to staging, manual promotion to production. This one decision has saved me more times than I can count.</p>

<h2>Docker Images That Do Not Suck</h2>
<p>Most Docker images I see in the wild are bloated, insecure, and slow to build. Here are the rules I follow:</p>

<ul>
<li><strong>Multi-stage builds</strong> — build stage compiles, runtime stage only has the binary</li>
<li><strong>Distroless or scratch base</strong> — no package manager, no shell, smaller attack surface</li>
<li><strong>Pinned base image tags</strong> — never use <code>latest</code> in production</li>
<li><strong>Non-root user</strong> — run as a dedicated user, never as root</li>
</ul>

<pre>FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/server /server
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/server"]</pre>

<h2>Secrets Management</h2>
<p>Never store secrets in environment variables baked into images. Use a proper secrets manager — HashiCorp Vault, AWS Secrets Manager, or even a simple encrypted file mounted at runtime. The principle is straightforward: secrets should exist only in memory during runtime, never on disk, never in version control, and never in build artifacts.</p>

<h2>What I Wish I Knew Earlier</h2>
<p>The biggest lesson: invest in your pipeline early. A well-built CI/CD pipeline pays compound interest. Every hour spent making builds faster, tests more reliable, and deploys safer comes back tenfold when you are pushing changes multiple times a day under pressure. Start simple, but start on day one.</p>`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
