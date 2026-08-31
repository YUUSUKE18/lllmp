import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            String line = scanner.next();
            if (line.isEmpty()) continue;
            
            int colonIndex = line.indexOf(':');
            if (colonIndex == -1) continue; // : を含んでいない場合は無視
            
            try {
                long value = Long.parseLong(line.substring(0, colonIndex));
                long repeat = Long.parseLong(line.substring(colonIndex + 1));
                
                if (repeat < 0) continue; // 回数が負の場合も無視
                
                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 数値解析エラーが発生した場合はこの行をスキップ
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
