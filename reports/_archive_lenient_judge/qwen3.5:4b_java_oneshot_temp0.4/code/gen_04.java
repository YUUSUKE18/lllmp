import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(",");
            
            for (String part : parts) {
                int n;
                try {
                    // 空白を除去して整数として解析
                    trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty() && Integer.parseInt(trimmedPart)) {
                        uniqueNumbers.add(Integer.parseInt(trimmedPart));
                    }
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
