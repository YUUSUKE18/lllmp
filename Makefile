# sandbox 動的テスト環境 — イメージのビルドとスモークテスト
# 実行は sandbox/ ディレクトリ直下から: make build
.PHONY: build build-go build-ts build-java test test-go test-ts test-java clean

build: build-go build-ts build-java

build-go:
	docker build -f runners/go/Dockerfile -t dyntest-go .

build-ts:
	docker build -f runners/ts/Dockerfile -t dyntest-ts .

build-java:
	docker build -f runners/java/Dockerfile -t dyntest-java .

# 計測層のスモークテスト（driver 不要・entrypoint を計測ラッパーに差し替え）
test: test-go test-ts test-java

test-go:
	@echo "== go: 正常 =="
	docker run --rm --entrypoint /opt/measure/measure.sh dyntest-go --timeout 3 --label ok -- sh -c 'echo hello'
	@echo "== go: タイムアウト =="
	docker run --rm --entrypoint /opt/measure/measure.sh dyntest-go --timeout 1 --label to -- sleep 5

test-ts:
	@echo "== ts: 正常 =="
	docker run --rm --entrypoint /opt/measure/measure.sh dyntest-ts --timeout 3 --label ok -- sh -c 'echo hello'

test-java:
	@echo "== java: 正常 =="
	docker run --rm --entrypoint /opt/measure/measure.sh dyntest-java --timeout 3 --label ok -- sh -c 'echo hello'

clean:
	-docker rmi dyntest-go dyntest-ts dyntest-java
