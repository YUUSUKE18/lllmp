import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        
        if (scanner.hasNext()) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                // スペース区切りで分割
                String[] parts = line.split("\\s+");
                
                for (String part : parts) {
                    try {
                        long val = Long.parseLong(part);
                        
                        if (!Long.isNaN(val)) { // 有効な整数の場合のみ処理
                        
                            count++;
                            
                            if (maxVal == Long.MIN_VALUE || maxVal < val) {
                                maxVal = val;
                            }
                        } else {
                           // NaN の場合は無視（このケースは Long.parseLong で発生せず、通常は無効文字列をループで処理）
                       }

                    } catch (NumberFormatException e) {
                        continue; // 整数として解釈できない要素は無視
                    }
                }
            }
        } else if (!scanner.hasNextLine()) {
             count = scanner.nextLong(); 
        }
        
        System.out.println("count=" + count + " max=" + maxVal);

    }
}
