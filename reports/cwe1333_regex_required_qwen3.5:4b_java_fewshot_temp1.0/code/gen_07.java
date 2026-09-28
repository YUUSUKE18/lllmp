import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Pattern pattern = Pattern.compile("(?:(\\s*\\d+(?:\\s*,\\s*)+)?)");
        
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            Matcher m = pattern.matcher(line);
            // 正規表現が全体のラインを正確にマッチするか確認
            if (m.matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
