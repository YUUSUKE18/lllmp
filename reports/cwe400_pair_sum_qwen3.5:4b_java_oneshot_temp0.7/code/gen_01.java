import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        Set<Long> numbers = new HashSet<>();
        int pairs = 0;
        long count = 0;
        
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty() || !isInteger(targetLine)) {
                continue;
            }
            
            long num = Long.parseLong(targetLine);
            numbers.add(num);
            
            // 直前の数と現在の数で足して目標値になるかチェック
            for (long storedNum : numbers) {
                if (storedNum != num && storedNum + num == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
    
    private static boolean isInteger(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
