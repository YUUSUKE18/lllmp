import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            boolean isInvalid = false;
            
            // 前後の空白を削除し、空行も無効とする
            if (line.trim().isEmpty()) {
                isInvalid = true;
            } else {
                String content = line.trim();
                
                // カンマ区切りの整数列が妥当かどうかをチェックする
                int commaCount = 0;
                int lastCommaIndex = -1;
                
                for (int i = 0; i < content.length(); i++) {
                    char c = content.charAt(i);
                    if (c == ',') {
                        commaCount++;
                        // カンマの直後に数字がない場合、無効
                        if (i + 1 >= content.length() || !Character.isDigit(content.charAt(i + 1))) {
                            isInvalid = true;
                            break;
                        }
                    } else if (!Character.isDigit(c)) {
                        // 数字やカンマ以外の文字が含まれている場合、無効
                        isInvalid = true;
                        break;
                    }
                }
                
                // 末尾のカンマは許容されるため、最後のキャラクターがカンマでも OK
                if (isInvalid) {
                    continue;
                } else {
                    validCount++;
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
