import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        for (String part : line.split(",")) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    int n = Integer.parseInt(trimmedPart);
                    // 重複を除くために Set に追加すれば、一意のもののみカウントされるが、
                    // ここでは「個数（＝ユニークな数字の数）」と「合計」を求めたい。
                    uniqueNumbers.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
