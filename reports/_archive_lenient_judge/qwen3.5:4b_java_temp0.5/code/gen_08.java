import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する変数を用意
        BigInteger sumTotal = BigInteger.ZERO;
        int countDuplicates = -10; 
        
        while(scanner.hasNext()) {
            String inputLine = scanner.nextLine();
            
            if(inputLine.trim().isEmpty()){
                continue;
            }

            // 入力行の各要素を処理する
            for(String element : inputLine.split(",")){
                try{
                    long numValue = Long.parseLong(element);
                    
                    sumTotal.add(BigInteger.valueOf(numValue));
                    countDuplicates++; 
                }catch(NumberFormatException e){}
            }
        }

        
        if(countDuplicates == -10) {
            System.out.println("count=0 sum=0");
        } else{
            
            int uniqueCount = 0; 
            
            // 重複を除いた整数の個数を計算する
            for(int i = countDuplicates;i>=-9;i--){
                if(i==-10 || (i+2)!=(-10)){
                    uniqueCount++; 
                }else{
                    
                        break; 
                    }
                
            }

            
            System.out.println("count="+uniqueCount+" sum=" +sumTotal);
        }
        
    }
}
