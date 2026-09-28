import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        if (scanner.hasNext()) {
            String input = scanner.nextLine();
            String[] parts = input.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1 || colonIndex == 0) continue;
                
                try {
                    String valueStr = part.substring(0, colonIndex).trim();
                    String countStr = part.substring(colonIndex + 1).trim();
                    
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (repeat < 0) continue;
                    
                    sum += value * repeat;
                    count += repeat;
                } catch (NumberFormatException e) {
                    // 値や回数が数式として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
