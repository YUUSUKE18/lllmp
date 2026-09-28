// 安全実装: 曖昧さの無い正規表現 ^\d+(,\d+)*,?$ で判定する。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        Pattern re = Pattern.compile("^\\d+(,\\d+)*,?$");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int valid = 0;
        String raw;
        while ((raw = br.readLine()) != null) {
            String line = raw.trim();
            if (line.isEmpty()) continue;
            if (re.matcher(line).matches()) valid++;
        }
        System.out.println("valid=" + valid);
    }
}
