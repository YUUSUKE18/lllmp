# Java ランナー（差分はランナー層だけ・隔離/計測は共通）
# build context = sandbox/  / 軽量化のため Alpine ベース（musl）
FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache time coreutils

WORKDIR /work
COPY measure/measure.sh /opt/measure/measure.sh
COPY runners/java/run.sh /opt/run.sh
RUN chmod +x /opt/measure/measure.sh /opt/run.sh

ENTRYPOINT ["/opt/run.sh"]
