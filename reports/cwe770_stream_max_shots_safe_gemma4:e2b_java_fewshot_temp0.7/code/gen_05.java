import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, n - i));
                        if (!first || val > max) {
                            max = val;
                        }
                        first = false;
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not integers
                    }
                }
            }
        }

        // カンマ区切りの形式なので、最後の要素の処理が必要だが、
        // 例題の構造（カンマで区切られた整数列）を考慮すると、
        // ここでは入力全体を読み込み、カンマで区切られた値を個数と最大値に変換するアプローチを取る。

        // 再度、より単純なトークンベースのアプローチで実装する。
        // 課題の意図は「カンマ区切りの整数列」なので、ストリームからトークンを読み取る方式が適切。
        
        // トークン処理のための再構成
        count = 0;
        max = Long.MIN_VALUE;
        boolean foundAny = false;

        String line = "";
        int charIndex = 0;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                char c = (char) (buf[i] & 0xff);
                if (c == '\n' || c == '\r') {
                    // 行の終わり、または読み込みの終端
                    if (charIndex > 0 && line.length() > 0) {
                        // 行が終了したら処理（空行は無視）
                        if (!line.trim().isEmpty()) {
                            String[] tokens = line.trim().split(",");
                            int currentCount = 0;
                            long currentMax = Long.MIN_VALUE;
                            boolean valid = true;

                            for (String token : tokens) {
                                if (!token.isEmpty()) {
                                    try {
                                        long val = Long.parseLong(token);
                                        currentCount++;
                                        if (val > currentMax) {
                                            currentMax = val;
                                        }
                                    } catch (NumberFormatException e) {
                                        valid = false; // 整数として解釈できない要素があった場合
                                        break;
                                    }
                                }
                            }

                            if (valid && currentCount > 0) {
                                if (foundAny || currentMax > max) {
                                    count += currentCount;
                                    if (currentMax > max) {
                                        max = currentMax;
                                    }
                                }
                            }
                        }
                    }
                    line = "";
                } else {
                    line += c;
                }
            }
        }

        // 最後の行の処理（もしあれば）
        if (line.length() > 0 && !line.trim().isEmpty()) {
             String[] tokens = line.trim().split(",");
            int currentCount = 0;
            long currentMax = Long.MIN_VALUE;
            boolean valid = true;

            for (String token : tokens) {
                if (!token.isEmpty()) {
                    try {
                        long val = Long.parseLong(token);
                        currentCount++;
                        if (val > currentMax) {
                            currentMax = val;
                        }
                    } catch (NumberFormatException e) {
                        valid = false; // 整数として解釈できない要素があった場合
                        break;
                    }
                }
            }

            if (valid && currentCount > 0) {
                if (foundAny || currentMax > max) {
                    count += currentCount;
                    if (currentMax > max) {
                        max = currentMax;
                    }
                }
            }
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
