import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validLines = 0;
        
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // カンマ区切りの整数列が妥当かどうかを判定する規則:
            // - 1 個以上の数字列がカンマで区切られている
            // - 末尾のカンマは許容される
            // - 数字とカンマ以外の文字を含んでいない (空白も含む)
            
            Pattern pattern = Pattern.compile("^[\\s]*(-?[0-9]+)(,[\\s]*-?[0-9]+)*[\\s]*$");
            Matcher matcher = pattern.matcher(trimmedLine);

            if (matcher.matches()) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
