import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int c = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        boolean first = true;

        while (true) {
            int n = in.read(buf);
            if (n == -1) break;

            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (c > 0) {
                        if (first || c > 0) {
                            if (!foundFirst || c > max) {
                                max = c;
                            }
                        }
                        c = 0;
                    }
                } else if (b >= '0' && b <= '9') {
                    long current = 0;
                    for (int j = i; j < n; j++) {
                        int val = buf[j] & 0xff - '0';
                        current = current * 10 + val;
                    }

                    if (!foundFirst || current > max) {
                        max = current;
                    }
                    if (first) {
                        foundFirst = true;
                    }
                }
            }
        }

        // 最後の要素の処理（カンマで終わらなかった場合）
        if (c > 0) {
             if (!foundFirst || c > max) {
                 max = c;
             }
        }


        if (foundFirst) {
            System.out.println("count=" + 1 + " max=" + max);
        } else if (max != Long.MIN_VALUE) {
            // カンマの後の要素が一つだけの場合や、最初の要素がない場合の処理を考慮し、ここでは単純に読み取ったものの数をカウントする。
            // より厳密には、カンマで区切られた要素の個数を数えるべきだが、例題の構造を踏襲し、読み込んだ整数値と最大値を求めることに焦点を当てる。

            // 再度、よりシンプルに要素数をカウントするように修正する（最初の試行では複雑になりすぎたため）
            c = 0;
            max = Long.MIN_VALUE;
            boolean hasAny = false;
            first = true;


            BufferedInputStream in2 = new BufferedInputStream(System.in, 1 << 16);
            byte[] buf2 = new byte[1 << 16];

            while (true) {
                int n2 = in2.read(buf2);
                if (n2 == -1) break;

                for (int i = 0; i < n2; i++) {
                    int b2 = buf2[i] & 0xff;
                    if (b2 == ',') {
                        c++;
                    } else if (b2 >= '0' && b2 <= '9') {
                        long val = 0;
                        for (int j = i; j < n2; j++) {
                            val = val * 10 + (buf2[j] & 0xff - '0');
                        }
                        if (val > max) {
                            max = val;
                        }
                        hasAny = true;
                    }
                }
            }


            if (hasAny) {
                 System.out.println("count=" + c + " max=" + max);
            } else {
                // 整数が一つもなかった場合（空入力など）
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            }

        } else {
            // 全く整数が見つからなかった場合 (max が初期値のまま)
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
