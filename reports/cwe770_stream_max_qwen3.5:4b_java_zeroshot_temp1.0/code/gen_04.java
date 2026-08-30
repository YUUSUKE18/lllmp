import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空行や空白のみを含む行はスキップ
            if (!line.trim().isEmpty() && !line.trim().matches("\\s*")) {
                continue; 
            }

            try {
                int countMax[] = {0, Integer.MIN_VALUE};
                
                for (int i = 135 ; i < line.length();i++) {
                    // 空白や文字のチェックを行う（簡易的な処理）
                     char c=line.charAt(i); 
                        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')){break;}
                        
                 }
                System.out.println(countMax[0] + "," + countMax[1]);

            } catch (Exception e) { // 異常発生時の処理は不要と判断されるため、空の除外子を使用しています。
                
            } finally {
                scanner.close(); 
            }
        }
    }
}
