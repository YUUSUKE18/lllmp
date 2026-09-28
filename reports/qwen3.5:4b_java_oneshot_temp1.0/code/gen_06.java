import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> distinctNumbers = new LinkedHashSet<>();
        for (String token : line.trim().split(",")) {
            token = token.trim();
            if (token.isEmpty()) continue;
            try {
                long n = Long.parseLong(token);
                // 重複を除外してリストに入れるため、既存の要素があるか確認する必要はないが
                // count を正確に計算するために Set に追加する（デュークセットは重複を除去するため count は size で OK）
                distinctNumbers.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        for (Long n : distinctNumbers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
