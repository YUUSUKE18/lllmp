import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                int num;
                try {
                    num = Integer.parseInt(part.trim());
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        long count = distinctNumbers.size();
        long sum = 0;
        for (Integer n : distinctNumbers) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
