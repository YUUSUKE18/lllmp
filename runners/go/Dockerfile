# Go ランナー（差分はランナー層だけ・隔離/計測は共通）
# build context = sandbox/  / 軽量化のため Alpine ベース（musl）
FROM golang:1.26-alpine

# GNU time（/usr/bin/time -v）と GNU coreutils（timeout --kill-after / base64 / mktemp）。
# Alpine 既定の busybox 版は -v や --kill-after を持たないため明示インストールする。
RUN apk add --no-cache time coreutils

# --network none 下での toolchain DL 禁止 / cgo 無効（gcc 無しでビルド可能に）
ENV GOTOOLCHAIN=local GOFLAGS=-mod=mod CGO_ENABLED=0

WORKDIR /work
COPY measure/measure.sh /opt/measure/measure.sh
COPY runners/go/run.sh   /opt/run.sh
RUN chmod +x /opt/measure/measure.sh /opt/run.sh

ENTRYPOINT ["/opt/run.sh"]
