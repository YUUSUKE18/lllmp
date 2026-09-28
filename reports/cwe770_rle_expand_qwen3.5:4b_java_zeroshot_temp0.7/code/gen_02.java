import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            if (!scanner.hasNextLine()) break;
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty() || !part.contains(":")) continue;
                
                String[] valueAndCount = part.split(":");
                if (valueAndCount.length != 2) continue;
                
                try {
                    long value = Long.parseLong(valueAndCount[0].trim());
                    long repeatCount = Long.parseLong(valueAndCount[1].trim());
                    
                    if (repeatCount < 0) continue;
                    
                    count += repeatCount;
                    sum += value * repeatCount;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
