import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Scanner sc = new Scanner(line);
            
            while (sc.hasNext()) {
                if (!sc.hasNextInt()) {
                    continue;
                }
                int value = sc.nextInt();
                
                if (!sc.hasNextInt()) {
                    sc.next(); // 小数点や文字列がある場合をスキップ
                    continue;
                }
                
                long repetitions = sc.nextInt();
                
                count += repetitions;
                sum += (long) value * repetitions;
            }
            sc.close();
        }
        
        System.out.println("count=" + count + " sum=" + sum);
        System.out.flush();
    }
}
