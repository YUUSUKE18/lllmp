import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }
        String line = sc.nextLine();
        String[] parts = line.split(",");
        
        long count = 0;
        long sum = 0;
        
        for (String part : parts) {
            String[] kv = part.trim().split(":");
            if (kv.length != 2) continue;
            
            try {
                long value = Long.parseLong(kv[0].trim());
                int repeat = Integer.parseInt(kv[1].trim());
                
                if (repeat < 0) continue; // 回数は 0 以上
                
                for (int i = 0; i < repeat; i++) {
                    count++;
                    sum += value;
                }
            } catch (NumberFormatException e) {
                continue; // 数値ではない要素は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
