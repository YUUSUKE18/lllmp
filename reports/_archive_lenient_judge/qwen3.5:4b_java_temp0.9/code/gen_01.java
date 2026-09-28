import java.util.Scanner;
import java.util.HashSet;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            HashSet<Integer> uniqueNumbers = new HashSet<>();
            
            for (String token : line.split(",")) {
                token = token.trim();
                try {
                    int num = Integer.parseInt(token);
                    // 重複を除いた整数をセットに追加
                    if (!uniqueNumbers.contains(num)) {
                        uniqueNumbers.add(num);
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }

            int count = uniqueNumbers.size();
            
            BigInteger sumBigInt = new BigInteger("0");
            for (int num : uniqueNumbers) {
                sumBigInt = sumBigInt.add(BigInteger.valueOf(num));
            }

            System.out.println("count=" + count + " sum=" + sumBigInt.toString());
        } else if (scanner.hasNext()) {
            String token;
            while ((token = scanner.next()).isNotBlank() && scanner.hasMoreTokens() || !scanner.hasNextInt()){
                try{
                    int num = Integer.parseInt(token);
                    uniqueNumbers.add(num);
                } catch(NumberFormatException e){}
            }
            
            count = uniqueNumbers.size();
            BigInteger sumBigInt2 = new BigInteger("0");
            for (int num : uniqueNumbers) {
                sumBigInt2 = sumBigInt2.add(BigInteger.valueOf(num));
            }

            System.out.println("count=" + count + " sum=" + sumBigInt2.toString());
        }
    }
}
