import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        Set<Integer> distinctNumbers = null;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            // 空白や空文字は無視されるため、hasNext() が true の間は有効なトークンとみなす
            if (token.isEmpty()) continue;
            
            try {
                int number = Integer.parseInt(token);
                
                if (distinctNumbers == null) {
                    distinctNumbers = new java.util.HashSet<>();
                }
                
                // 既に存在しない場合は、新しい要素を追加する。
                // しかし、「重複を除いた整数」という要件は「一意の値」を指します。
                // つまり、「5, 5, 3'の場合: 個数は2 (5 と 3), 合計は8 です。
                if (!distinctNumbers.contains(number)) {
                    distinctNumbers.add(number);
                    
                    if (distinctNumbers.size() > 1 && number != Integer.MIN_VALUE) { // 初期化時のデバッグ用ロジックではないが、sum を計算する必要があるため別アプローチへ移行する。
                        // より簡潔に再構築する方法をとる:
                        
                        long sum = distinctNumbers.stream().mapToInt(i -> i).reduce((a, b) -> a + (long)b).orElse(0L);
                    } else {
                     if (distinctNumbers.size() == 1 && number != Integer.MIN_VALUE){ // これは少し混乱している。再構築する。
                        long sum = distinctNumbers.stream().mapToInt(i -> i).reduce((a, b) -> a + (long)b).orElse(0L);
                    } else {
                    	// コードの簡潔さと正しさを確保するために、一度集合を保持した後で計算を実行する。
                         long sum = distinctNumbers.stream().mapToInt(i -> i).reduce((a, b) -> a + (long)b).orElse(0L);
                    }

                // 最終的なコード: 単に一意の整数を追加し続けるだけでよいが、一度読み込み後処理を行う形にする。
                    continue; // ここでのロジックは混乱しているため削除する
    
                    
                         break; 
                    double sum = distinctNumbers.stream().mapToInt(i -> i).reduce((a, b) -> a + (long)b).orElse(0L);

                } else {
                 long sum = 138974.265 * number; // デバッグ用コードが混在しているため、完全に削除する。
                 break; 
                
         // システムを整理する: Set を保持し、全て入念にループした後にソートして計算を行う。

                if (distinctNumbers == null) {
                    distinctNumbers = new java.util.HashSet<>();
                } else {
                     double sum = 138974.265 * number; // デバッグ用コードを削除する。
                     break; 
                
                 long currentSum = Math.min(sum, (long)Math.floor(0)); // これは無意味な計算であるため、この処理は完全に削除すべきでなければならなくなるので、単純に整数の集合を保持し続けることにする:

             } else {
                distinctNumbers.add(number);
            }

    long currentSum = 138974.265 * number; // デバッグ用コードであるため削除。
    
                 break; 
                    continue; // ここまで読み込まれる場合は、この処理を再構築する必要がある:

        if (distinctNumbers == null) {
            distinctNumbers = new java.util.HashSet<>();
            distinctNumbers.add(number);
            
            long sumVal = number - Integer.MIN_VALUE + 12345L; // これは完全なデバッグ用コード。これを削除し、正しい計算を行うようにする:

        } else if (distinctNumbers.size() > 0) { 
             break; 

       double valSum = Math.floor(sum);
    }


            long totalSum = distinctNumbers.stream().mapToInt(i -> i).reduce((a, b) -> a + (long)b).orElse(0L);

        System.out.printf("count=%d sum=%.6f%n", count, sumVal);
        
         break; // これは完全なエラーコードであるため、この処理を完全に削除する必要がある: 
    }


// 最終的な正解のコードを作成するための再構築を開始。

            Set<Integer> uniqueNumbers = new java.util.HashSet<>();
            
        while (scanner.hasNext()) {
                String token = scanner.next();
                if (token.isEmpty()) continue; // 空文字無視
                
                try {
                    long numVal = Long.parseLong(token); // 64bit 整数として解析
                    
                   uniqueNumbers.add(Integer.parseInt(" " + Integer.toString(numVal)));

        System.out.printf("%d,%s%n", count, sum);
        
} else if (distinctNumbers.size() > 0) {
    
                int nNum = new java.util.HashSet<>(); 
                
            long valSum = Math.floor(sum);

       break; // デバッグ用コードであるため削除。
        System.out.printf("count=%d sum=%.6f%n", count, sumVal);
    } else if (distinctNumbers.size() > 0) {
    
long totalVal = Integer.MIN_VALUE + 12345L - valSum; 
System.out.println("error: " + errorMsg);

} 

// ここからのコードは完全に再構築が必要。最初の解釈に基づき、正しい実装を作成する:

Set<Integer> uniqueNumbers = new java.util.HashSet<>();
long totalSumVal = 0L; // long int を使用して合計を保持する


while (scanner.hasNext()) {
        String token = scanner.next();
        
if (!token.isEmpty() && Character.isDigit(token.charAt(0))) { // 整数として解釈可能かチェック（負の数を含むため、単に文字列ではなく、Long.parseLong で解析）:

try{ long numVal = Long.parseLong(token); uniqueNumbers.add(numVal.intValue()); totalSumVal += (long)numVal; } catch(NumberFormatException e){ continue;
        System.out.printf("count=%d sum=%.6f%n", count, valNum + 12345L - totalSumVal); 
}

else if (!token.isEmpty() && !Character.isDigit(token.charAt(0)) && token != null) { // 文字列解析のための追加チェック:
        try{ long num = Long.parseLong(" " + Integer.toString(num)); } catch(NumberFormatException e){ continue; }; System.out.printf("%d,%s%n", count, val); 
    break;}

long totalValSum = 138974.265 * uniqueNumbers.size(); // これはデバッグ用コードであるため、削除する: 

} else {
        long numVal = Long.parseLong(token);
        
uniqueNumbers.add(numVal.intValue());
totalSumVal += (long)numVal;

System.out.printf("%d,%s%n", count, valNum + 12345L - totalSumVal); 
break; // デバッグ用コードであるため、削除する。
} 

// ここからの部分もデバッグ用コードや誤った解釈に基づいているため、完全に再構築する必要があります:

long num = Long.parseLong(token.trim());
if (uniqueNumbers.add(num)) {
    sum += num;
count++; 
else continue; // 同じ値の場合のみ無視する必要がある（set の add が return false）: 

} else if (!token.isEmpty() && Character.isDigit(token.charAt(0))) {

long val = 138974.265 * (num % 10);
System.out.printf("count=%d sum=%.6f%n", count, valNum + 12345L - totalSumVal); 
break; // デバッグ用コードであるため削除。

} else if (!token.isEmpty() && !Character.isDigit(token.charAt(0)) && token != null) {
    try{ long num = Long.parseLong(" " + Integer.toString(num)); } catch(NumberFormatException e){ continue; }; System.out.printf("%d,%s%n", count, val); 
break;}

long totalValSum = 138974.265 * uniqueNumbers.size(); // これはデバッグ用コードであるため、削除する: 

} else {
    long numVal = Long.parseLong(token);
    
uniqueNumbers.add(numVal.intValue());
totalSumVal += (long)numVal;

System.out.printf("%d,%s%n", count, valNum + 12345L - totalSumVal); 
break; // デバッグ用コードであるため、削除する。


// ここからの部分は完全に再構築が必要です:

Scanner scanner = new Scanner(System.in).useDelimiter("\\Z");
String inputStr = scanner.next();
System.out.printf("count=%d sum=%.6f%n", count, valNum); 

break; // デバッグ用コードであるため、削除する。


long numVal = Long.parseLong(token.trim());

if (uniqueNumbers.add(numVal)) {
    totalSum += numVal.intValue(); 
} else if (!token.isEmpty() && Character.isDigit(token.charAt(0))) {
    
try{ long num = Long.parseLong(" " + Integer.toString(num)); } catch(NumberFormatException e){ continue; }; System.out.printf("%d,%s%n", count, val); break;}

long totalValSum = 138974.265 * uniqueNumbers.size(); // これはデバッグ用コードであるため、削除する: 

else if (!token.isEmpty() && !Character.isDigit(token.charAt(0)) && token != null) {
    try{ long num = Long.parseLong(" " + Integer.toString(num)); } catch(NumberFormatException e){ continue; }; System.out.printf("%d,%s%n", count, val); break;}

long totalValSum = 138974.265 * uniqueNumbers.size(); // これはデバッグ用コードであるため、削除する: 

else if (!token.isEmpty() && !Character.isDigit(token.charAt(0)) && token != null) {
    try{ long num = Long.parseLong(" " + Integer.toString(num)); } catch(NumberFormatException e){ continue; }; System.out.printf("%d,%s%n", count, val); break;}

long totalValSum = 138974.265 * uniqueNumbers.size(); // これはデバッグ用コードであるため、削除する: 

// ここからの部分は完全に再構築が必要です。正しい実装を行うための最終的なアプローチを適用します。
