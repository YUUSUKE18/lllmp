import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            // 正規表現: 空白を区切り文字として許容しつつ、数字とカンマのみを含む行を検出
            // ^は始点、$は終点、[0-9,]+は数字またはカンマの1つ以上の連続、\s*は任意の空白
            if (line.matches("^[\\s]*[0-9,]+[\\s]*$")) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
