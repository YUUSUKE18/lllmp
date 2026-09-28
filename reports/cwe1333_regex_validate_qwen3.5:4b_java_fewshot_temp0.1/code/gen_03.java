import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        // 空白を除去して処理
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // カンマ区切りの整数列として解析する
        // StringTokenizer はデフォルトで空白区切りだが、カンマも区切り文字に指定できる
        // あるいは split を使う。split(",") でカンマ区切りにする。
        
        String[] parts = trimmed.split(",");
        
        // 各部分が整数であるかチェック
        for (String part : parts) {
            if (part.isEmpty()) {
                return false;
            }
            try {
                Integer.parseInt(part);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        
        // 上記の条件を満たす場合、妥当と判定する。
        // 要件: "1 個以上の数字列がカンマで区切られて並んでいる"
        // split(",") で空文字列が含まれる場合は (例: ",," や "1,,2") 不合法になるはずだが、
        // Integer.parseInt("") が例外を吐くので自然に除外される。
        // ただし、要件の「末尾のカンマは許容します」も満たすか確認。
        // "1," -> split(",") -> ["1", ""] -> "" は parseInt で例外なので OK。
        
        return true;
    }
}
