import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成（BigInteger で扱うため）
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                // Integer.parseInt は -2^31 ~ 2^31-1 の範囲しか扱えないが、
                // 問題文の「整数として解釈できない要素も無視」および「合計は 64bit」という条件から、
                // 入力自体は通常 int 範囲であると想定し、int で解析する。
                // もし非常に大きな個数（例：10^9 回同じ数字）が入り込むと count は溢れるが、
                // Java の int (2*10^9) が上限になるため、仕様上この制限は許容範囲とする。
                long value = Long.parseLong(token); 
                
                sum.add(BigInteger.valueOf(value));
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
