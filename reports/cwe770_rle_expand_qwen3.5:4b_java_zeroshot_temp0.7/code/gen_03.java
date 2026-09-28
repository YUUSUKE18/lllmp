import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                
                String[] valuePart = part.split(":");
                if (valuePart.length != 2) {
                    continue;
                }
                
                try {
                    long value = Long.parseLong(valuePart[0].trim());
                    long repeat = Long.parseLong(valuePart[1].trim());
                    
                    if (repeat < 0) {
                        continue;
                    }
                    
                    sum += value * repeat;
                    count += repeat;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
