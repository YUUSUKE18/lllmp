// 素朴実装: 入れ子量化子を含む正規表現 ^(\d+,?)+$ で判定する。
// java.util.regex はバックトラック方式なので指数的に爆発する（ReDoS）。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        Pattern re = Pattern.compile("^(\\d+,?)+$");
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
