import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String firstLine = sc.nextLine();
            try {
                int countInput = Integer.parseInt(firstLine.trim());
                long sum = 0;
                int countRead = 0;
                
                while (sc.hasNextLine()) {
                    String line = sc.nextLine();
                    if (line.isEmpty()) continue;
                    
                    for (String token : line.split("\\s+")) {
                        try {
                            long value = Long.parseLong(token);
                            sum += value;
                            countRead++;
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない行またはトークルは無視
                        }
                    }
                }
                
                System.out.println("count=" + countRead + " sum=" + sum);
            } catch (NumberFormatException e) {
                // 1 行目の値が整数でない場合、処理なし（無効）
            }
        }
    }
}
