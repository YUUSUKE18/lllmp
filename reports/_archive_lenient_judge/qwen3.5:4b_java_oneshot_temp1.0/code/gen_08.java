import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> distinctNumbers = new HashSet<>();
        int countDistinct = 0;
        
        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        int n = Integer.parseInt(part);
                        distinctNumbers.add(n);
                        countDistinct++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }
        } else if (!distinctNumbers.isEmpty()) {
            // line が null でも空でない場合を考慮（例：null は不可能だがロジックの確実性のため）
             countDistinct = distinctNumbers.size(); 
        }

        long sum = 0;
        for (int n : distinctNumbers) {
            sum += n;
        }
        
        System.out.println("count=" + countDistinct + " sum=" + sum);
    }
}
