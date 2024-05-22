ARG VARIANT=ubuntu-20.04
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}
USER vscode

RUN curl -s https://gist.githubusercontent.com/LukeChannings/09d53f5c364391042186518c8598b85e/raw/ac8cd8c675b985edd4b3e16df63ffef14d1f0e24/deno_install.sh | sh
RUN export DENO_INSTALL=/home/vscode/.deno
RUN export PATH=${DENO_INSTALL}/bin:${PATH}
RUN /home/vscode/.deno/bin/deno install --import-map https://dev.cdn.unyt.org/importmap.json -Ar -n uix https://dev.cdn.unyt.org/uix/run.ts
RUN echo "export DENO_INSTALL=/home/vscode/.deno" >> ~/.bashrc
RUN echo "export PATH=\${DENO_INSTALL}/bin:\${PATH}" >> ~/.bashrc