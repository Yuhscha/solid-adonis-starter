FROM rust:1.90

# Install essential packages
RUN apt-get update && apt-get install -y \
  git \
  curl \
  sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install mise (dev tools version manager) via cargo
ENV CARGO_HOME="/usr/local/cargo"
RUN cargo install mise

# Configure mise tools defaults
RUN mkdir -p /root/.config/mise
RUN cat > /root/.config/mise/config.toml <<'EOF'
[tools]
node = "24"
"npm:pnpm" = "latest"
"npm:@anthropic-ai/claude-code" = "latest"
"npm:@openai/codex" = "latest"
"npm:@google/gemini-cli" = "latest"
"npm:@github/copilot" = "latest"
EOF

# Setup mise environment first
ENV MISE_DATA_DIR="/root/.local/share/mise"
ENV PATH="/root/.local/share/mise/shims:/root/.local/bin:/usr/local/cargo/bin:$PATH"

# Install configured tools via mise and activate shims
RUN mise install && \
  mise reshim

# Install just (command runner) to system-wide location
RUN cargo install just && \
  cp /usr/local/cargo/bin/just /usr/local/bin/just

# Verify installations
RUN mise exec -- node --version && \
  mise exec -- pnpm --version && \
  just --version

# Set working directory
WORKDIR /workspace
