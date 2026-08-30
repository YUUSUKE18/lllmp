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
        long[] rawNumbers = {}; // 初期化用変数（実際はループ内で追加）
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    int num = Integer.parseInt(part.trim());
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
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
