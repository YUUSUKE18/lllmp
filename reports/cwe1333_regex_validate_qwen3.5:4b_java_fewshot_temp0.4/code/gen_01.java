import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        line = line.trim();
        if (line.isEmpty()) return false;

        int len = line.length();
        int i = 0;

        while (i < len) {
            char c = line.charAt(i);
            if (!Character.isDigit(c)) {
                return false;
            }
            i++;
            if (i < len && line.charAt(i) == ',') {
                i++;
            }
        }

        // 末尾にカンマがある場合も許容するため、最後の文字が数字か確認済みだが、
        // 上記ループでは末尾の数字まで処理し、その後にカンマがあった場合は i が len より 1 進むはず。
        // しかし、while (i < len) の条件で i=0 から始まる場合、最初の数字を処理した後、
        // 末尾にカンマがあれば i は len になるはずだが、実際にはカンマの位置まで進んでいる。
        // 再確認: 例 "123," -> i=0(1), i=1(2), i=2(3), i=3(,) -> i=4. len=4. ループ終了。OK.
        // 例 "123" -> i=0(1), i=1(2), i=2(3). len=3. ループ終了。OK.
        // 例外: 空白が含まれている場合、trim で削除済みだが、内部に空白があれば false に戻るはず。
        // 上記ロジックでは、空白が出現すると !Character.isDigit(c) が true となり return false. OK.

        return true;
    }
}
