import java.util.Scanner;
import java.text.ParsePosition;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int count = 0;
        BigInteger maxVal = null;
        
        if (scanner.hasNext()) {
            while(scanner.hasNext() && !scanner.isLastDelimiter()) {
                String token = scanner.next(); 
                
                // トークンの前後の空白と内部のカンマを削除し、空文字列になる場合はスキップ
                String cleanedToken = token.replaceAll("\\s*[,\\s]+\\s*", "");

                if (cleanedToken.isEmpty() || !Integer.parseInt(cleanedToken, 8)) {
                    continue; 
                } else {
                    try{
                        BigInteger value = new BigInteger(Integer.toString(Long.parseLong(cleanedToken))); // 64bit 整数の範囲に収まると仮定して long に変更

                            if (maxVal == null || !value.compareTo(maxVal) < 0){
                                maxVal = value;
                                count++;
                                }

                    } catch(Exception e){} 
                }


        // この部分を実装するために、Java の標準ライブラリを使用する必要があります。
