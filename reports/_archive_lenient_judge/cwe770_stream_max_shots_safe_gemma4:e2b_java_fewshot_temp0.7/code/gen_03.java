import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        String currentNumber = "";
        int n;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                char c = (char) (buf[i] & 0xff);
                if (c == ',') {
                    if (!currentNumber.isEmpty()) {
                        try {
                            long num = Long.parseLong(currentNumber);
                            count++;
                            if (num > max) {
                                max = num;
                            }
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない場合は無視（仕様上は発生しないはずだが安全のため）
                        }
                        currentNumber = "";
                    }
                } else if (c >= '0' && c <= '9') {
                    currentNumber += c;
                }
            }
        }

        // 最後の要素の処理
        if (!currentNumber.isEmpty()) {
            try {
                long num = Long.parseLong(currentNumber);
                count++;
                if (num > max) {
                    max = num;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 要素が一つもなかった場合、count=0, maxの初期値（Long.MIN_VALUE）を考慮して出力。
            // ただし、空入力の場合、count=0, max=? となるため、ここでは何も出力しないか、仕様に合わせる。
            // カンマ区切りの要素がない場合は count=0, maxは意味を持たないが、最大値が存在しないケースとして扱う。
            // 厳密には「要素数」と「最大値」を求めるため、データがない場合はcount=0が出力されるべき。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // データがない場合の安全策
        }
    }
}
