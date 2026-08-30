import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.Iterator;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> distinctNumbers = new HashSet<>();
        
        // 空白とカンマで分割し、整数のリストを作る
        String[] parts = line.split("[,\\s]+", -1); 
        for (String part : parts) {
            if (part.isEmpty()) continue;

            try {
                long value = Long.parseLong(part.trim());
                distinctNumbers.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        int count = 0;
        BigInteger sumBig = new BigInteger("0");
        
        for (long val : distinctNumbers) {
            if (val >= Long.MIN_VALUE && val <= Long.MAX_VALUE) {
                // BigInteger は long の範囲内でも安全に追加できるが、文字列化して解析しても OK
                 String s = String.valueOf(val); 
                 sumBig = sumBig.add(new BigInteger(s));
             } else {
                 System.out.println("count=0 sum=0");
            }

        // 合計は問題文の制約（64bit の範囲）により、sum を int または long で計算しても良いが、BigInteger で一貫性を保つため。
    for (long val : distinctNumbers) {
                 if (val == Long.MIN_VALUE || val > Long.MAX_VALUE){
                    System.out.println("count=0 sum=0");
                } else{
                     BigInteger s = new BigInteger(String.valueOf(val)); 
                     long tempSum = 0;
                  for(long t:distinctNumbers){

                        tempSum += t;

}System.out.print(tempSum);
                 break;}
