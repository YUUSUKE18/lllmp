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
                        // Ignore elements that are not integers
                    }
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合を考慮する必要があるが、
        // この実装ではカンマの数をカウントし、値の読み取りを試みる。
        // より堅牢な方法として、入力を文字列として処理する方が簡単だが、
        // 例に倣いバイト配列から直接処理を試みる。

        // 再度、よりシンプルでロバストな処理を試みる（カンマ区切りの整数列の読み取り）
        // 実際には、入力全体を読み込み、カンマで分割し、各要素を解析するのが最も簡単。
        // 例題の形式に合わせるため、上記の方法を修正する。

        // --- 再実装 ---
        // 標準入力全体を文字列として読み込む方が、区切り文字処理が容易になる
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(in));
        String line;
        StringBuilder allNumbers = new StringBuilder();

        while ((line = reader.readLine()) != null) {
            if (!line.trim().isEmpty()) {
                String[] parts = line.split(",");
                for (String part : parts) {
                    try {
                        long val = Long.parseLong(part.trim());
                        allNumbers.append(val).append(",");
                    } catch (NumberFormatException e) {
                        // 無効な要素は無視
                    }
                }
            }
        }

        if (allNumbers.length() > 0) {
            String numbersStr = allNumbers.toString();
            // 末尾のカンマを削除
            if (numbersStr.endsWith(",")) {
                numbersStr = numbersStr.substring(0, numbersStr.length() - 1);
            }

            if (!numbersStr.isEmpty()) {
                String[] numStrings = numbersStr.split(",");
                count = numStrings.length;
                max = Long.MIN_VALUE;

                for (String s : numStrings) {
                    if (!s.trim().isEmpty()) {
                        try {
                            long val = Long.parseLong(s.trim());
                            if (val > max) {
                                max = val;
                            }
                        } catch (NumberFormatException e) {
                            // 無効な要素は無視（既にsplitで除外されているはずだが念のため）
                        }
                    }
                }

                if (count == 0 && !allNumbers.isEmpty()) {
                    // カンマのみの行など、数値が一つもなかった場合の処理を考慮するが、
                    // 仕様に従い、読み取れた有効な整数のみをカウントする。
                    // ここでは、splitで得られた要素数をカウントするのが最も安全。
                    count = 0;
                    max = Long.MIN_VALUE;
                    for (String s : numStrings) {
                        if (!s.trim().isEmpty()) {
                            count++;
                            try {
                                long val = Long.parseLong(s.trim());
                                if (val > max) {
                                    max = val;
                                }
                            } catch (NumberFormatException e) {
                                // 無効な要素は無視
                            }
                        }
                    }
                } else if (allNumbers.length() > 0 && count == 0) {
                     // カンマ区切りでデータがあったが、有効な整数が一つもなかった場合
                     count = 0;
                     max = Long.MIN_VALUE;
                }
            } else {
                count = 0;
                max = Long.MIN_VALUE;
            }

        } else {
             // 入力が空だった場合
            count = 0;
            max = Long.MIN_VALUE;
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
