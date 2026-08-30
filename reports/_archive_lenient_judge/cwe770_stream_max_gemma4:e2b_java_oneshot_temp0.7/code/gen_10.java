import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを処理
        String[] tokens = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
                long n = Long.parseLong(trimmedToken);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 有効な整数が見つからなかった場合、count=0 max=0 または適切なデフォルト値を設定する。
            // 問題の文脈から、読み込んだ値のみをカウントするのが自然だが、ここでは読み込んだ有効な数の個数と最大値を出す。
            // 読み込んだトークンから数値として解釈できたものの数をcountとする。
            if (line.contains(",")) {
                 // トークンが空でなければ、少なくとも0またはデフォルト値を出力する
                System.out.println("count=" + count + " max=" + (foundNumber ? max : 0));
            } else {
                // カンマ区切りで何も数値が見つからなかった場合（例: ",," や空行）
                 System.out.println("count=0 max=0");
            }
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
