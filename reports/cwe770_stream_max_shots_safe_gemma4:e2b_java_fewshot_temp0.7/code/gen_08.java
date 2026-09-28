import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b >= '0' && b <= '9') {
                    long val = 0;
                    for (int j = i; j < n; j++) {
                        int currentByte = buf[j] & 0xff;
                        if (currentByte >= '0' && currentByte <= '9') {
                            val = val * 10 + (currentByte - '0');
                        } else {
                            break;
                        }
                    }

                    if (val > 0) {
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合を考慮）
        // このロジックは、入力ストリーム全体からトークンを抽出するよりも複雑になるため、
        // 例2の構造に近づけつつ、整数列を直接扱う方法を採用します。

        // 再度、よりシンプルな方法で実装します。カンマ区切りで読み進める方式を採用します。

        // ----------------------------------------------------
        // 再実装: カンマ区切りの整数列を読み込む標準的な方法
        // ----------------------------------------------------
        
        // ストリーム全体を文字列として読み込み、パースする方が安全です。
        // ただし、ここでは指定された例の構造に厳密に従うため、入力をバイト単位で処理し続けます。
        
        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean firstElementFound = false;
        
        // 再度読み込み（ストリームポインタをリセットする必要があるが、ここでは再利用する）
        // 入力データが全てこのループで消費されることを期待します。

        // 最初の要素の検索と最大値の更新を再度実行
        count = 0;
        max = Long.MIN_VALUE;
        foundFirst = false;
        
        // バッファ全体を走査し、カンマで区切られた数値を抽出する
        for (int i = 0; i < n; i++) {
            if (buf[i] == ',') {
                count++;
            } else if (buf[i] >= '0' && buf[i] <= '9') {
                // 数値の読み取り（ここでは単一の数値として扱う）
                long val = 0;
                int j = i;
                while (j < n && buf[j] >= '0' && buf[j] <= '9') {
                    val = val * 10 + (buf[j] - '0');
                    j++;
                }
                
                if (val > 0) {
                    if (!foundFirst || val > max) {
                        max = val;
                        foundFirst = true;
                    }
                }
                i = j - 1; // ループカウンタをスキップ
            }
        }

        // カウントの調整：カンマの数と要素数の関係は、最後のカンマの有無に依存します。
        // この実装では、数値が見つかった回数をカウントする方が直接的です。
        
        long elementCount = 0;
        long actualMax = Long.MIN_VALUE;
        boolean isFirst = true;

        for (int i = 0; i < n; i++) {
            if (buf[i] == ',') {
                // カンマは要素の区切りを示す。次の要素が数値になるか確認する。
            } else if (buf[i] >= '0' && buf[i] <= '9') {
                long val = 0;
                int j = i;
                while (j < n && buf[j] >= '0' && buf[j] <= '9') {
                    val = val * 10 + (buf[j] - '0');
                    j++;
                }

                if (val > 0) {
                    elementCount++;
                    if (isFirst || val > actualMax) {
                        actualMax = val;
                        isFirst = false;
                    }
                }
                i = j - 1;
            }
        }


        System.out.println("count=" + elementCount + " max=" + actualMax);
    }
}
