import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        
        String line = sc.nextLine();
        BigInteger sumBig = BigInteger.ZERO;
        
        if (line != null && !line.isEmpty()) {
            // 空白を区切り文字として指定し、各要素を取得して整数チェックを行う
            for (String token : line.split("\\s*))")) {
                try {
                    int value = Integer.parseInt(token);
                    
                    sumBig.add(BigInteger.valueOf(value));
                } catch (NumberFormatException e) {
                    // 数値でない場合は無視する（catchブロックに入るため）
                }
            }
        }

        System.out.println("count=" + line.length() + "sum=" + BigInteger.ZERO);
    }
}
