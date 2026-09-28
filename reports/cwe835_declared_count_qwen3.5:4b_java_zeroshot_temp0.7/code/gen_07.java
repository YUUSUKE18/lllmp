import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int countLine = scanner.nextInt(); // 1 行目の値を読み取るが、実際の個数とは限らない
        
        int actualCount = 0;
        long sum = 0;
        
        for (int i = 0; i < Integer.MAX_VALUE; i++) { // 無限ループを想定して大量の行を読む
            if (!scanner.hasNext()) break; // 入力終了
            
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue; // 空行は無視
                
                try {
                    long value = Long.parseLong(line.trim());
                    actualCount++;
                    sum += value;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            } catch (Exception e) {
                break;
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
