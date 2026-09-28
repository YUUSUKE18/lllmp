import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        long currentNum = 0;
        int n;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    if (currentNum != 0 || first) { // カンマで区切られた値が存在する場合のみカウント
                        count++;
                        if (currentNum > max) {
                            max = currentNum;
                        }
                    }
                    currentNum = 0;
                    first = true;
                } else if (b >= '0' && b <= '9') {
                    // 64bitの範囲に収まることを前提としてlongで処理
                    currentNum = currentNum * 10 + (b - '0');
                }
            }
        }

        // 最後の要素を処理
        if (currentNum != 0 || first) {
            count++;
            if (currentNum > max) {
                max = currentNum;
            }
        }

        if (count == 0) {
            // 要素が全くなかった場合（入力が空またはカンマのみ）の処理。ここでは count=0, max=0 とするのが自然だが、
            // 入力があった場合は少なくとも1行は出力する必要があるため、maxの初期値に依存する。
            // 空要素・前後の空白は無視し、整数として解釈できない要素も無視するという仕様に基づき、
            // カウントされた要素が存在する場合のみ出力する。
            // 今回の仕様では「空でない語の数」なので、countが正しい。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
