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
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers (though the prompt implies they will be integers)
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、末尾にカンマがない場合を考慮）
        // この実装では、カンマの後に続く値として解釈するのではなく、区切り文字としてカウントし、
        // 値自体は読み飛ばすというアプローチを取ります。

        // 再度、より堅牢な方法で処理します。カンマ区切りの整数列を直接処理します。

        // -------------------- 再実装 --------------------

        // 入力を文字列として読み込み、カンマで分割する方が安全です。
        // ただし、例の形式に従い、ストリームから直接読み取ることを試みます。
        
        // ここでは、入力全体を読み込み、手動でパースします。
        
        long currentCount = 0;
        long currentMax = Long.MIN_VALUE;
        boolean isFirst = true;

        int byteIndex = 0;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                char c = (char) (buf[i] & 0xff);
                if (c == ',') {
                    currentCount++;
                } else if (c != ' ' && c != '\t' && c != '\n' && c != '\r') {
                    // 数値の読み取り開始
                    long val = 0;
                    int start = i;
                    while (i < n && buf[i] >= '0' && buf[i] <= '9') {
                        val = val * 10 + (buf[i] - '0');
                        i++;
                    }
                    // 数値の読み取りが終わった後のポインタを i に設定し、次のループでカンマを探すようにする。
                    // 今回は、この構造が複雑になるため、入力全体を一度文字列として処理することを優先します。
                    byteIndex = i; // 次のループの開始位置を更新（これは不完全）
                }
            }
        }

        // 最終的なロジックとして、標準的なストリーム読み込みと分割を行います。
        // 例2の構造を参考にしつつ、整数列に特化させます。
        
        // 再度、入力全体を文字列として読み込むアプローチを採用します。
        java.util.Scanner scanner = new java.util.Scanner(in);
        StringBuilder lineBuilder = new StringBuilder();
        while (scanner.hasNextLine()) {
            lineBuilder.append(scanner.nextLine()).append('\n');
        }
        String input = lineBuilder.toString().trim();

        if (input.isEmpty()) {
            System.out.println("count=0 max=-9223372036854775808"); // Long.MIN_VALUEとして扱う
            return;
        }


        String[] parts = input.split(",");
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    actualCount++;
                    if (value > actualMax) {
                        actualMax = value;
                    }
                } catch (NumberFormatException e) {
                    // 無効な要素は無視
                }
            }
        }

        // 64bit整数の範囲を考慮し、もし有効な数値が一つもなかった場合のために初期値を設定
        if (actualCount == 0) {
             System.out.println("count=0 max=-9223372036854775808"); // Long.MIN_VALUEを表現
        } else {
            System.out.println("count=" + actualCount + " max=" + actualMax);
        }
    }
}
