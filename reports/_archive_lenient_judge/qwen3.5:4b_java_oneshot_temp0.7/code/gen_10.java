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

        Set<Integer> distinctNumbers = new HashSet<>();
        long totalSum = 0L;
        boolean firstElementFound = false;

        String[] parts = line.split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;

            try {
                int num = Integer.parseInt(part);
                
                // 重複チェックと合計計算
                boolean isDuplicate = distinctNumbers.add(num);
                totalSum += num;
                
                // 最初の要素がまだない場合、個数をカウントする（または既に含まれているか再確認）
                if (isDuplicate) {
                    firstElementFound = true;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + totalSum);
    }
}
