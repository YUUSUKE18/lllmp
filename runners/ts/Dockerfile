# TypeScript ランナー（差分はランナー層だけ・隔離/計測は共通）
# build context = sandbox/  / 軽量化のため Alpine ベース（musl）
FROM node:24-alpine

RUN apk add --no-cache time coreutils \
 && npm install -g typescript@5 @types/node@24

WORKDIR /work
COPY measure/measure.sh /opt/measure/measure.sh
COPY runners/ts/run.sh   /opt/run.sh
RUN chmod +x /opt/measure/measure.sh /opt/run.sh

ENTRYPOINT ["/opt/run.sh"]
