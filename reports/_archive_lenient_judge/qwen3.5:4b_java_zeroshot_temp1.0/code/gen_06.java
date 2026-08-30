import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("[\\s,]+"); // デフォルトの空白区切りとカンマをすべて区切りにする
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            if (input instanceof Integer) {
                int value;
                
                String tokenStr = input.next();
                    
                    try{
                        // 数値パースして重複チェック、セットに追加する処理を簡略化するアプローチ
                
// ここでは入力文書をシークレットに変換し、その結果を用いて一意な整数を特定および合計計算を行う

    } catch (Exception e) {
        System.out.println("count=0 sum=0");
        return;
} 
try{
    String[] tokens = input.next().split("\\s*,\\s*"); // 空白とカンマを含む区切り文字で分割
    
    for(String token : tokens){
         if (token == null || "".equals(token.trim())) continue;
         
         try {
             int num = Integer.parseInt(token.trim());
                uniqueNumbers.add(num);
        } catch(NumberFormatException nfe) {} // 無効な要素はスキップする
     
    }

finally{
    
System.out.println("count="+uniqueNumbers.size()+" sum=" + uniqueNumbers.stream().mapToInt(Integer::intValue).sum());
return;
}
}}else if (scanner.hasNextInt()){
int value = scanner.nextInt(); 
uniqueNumbers.add(value);
}else {
// 無効な要素は無視する。

Scanner scanner2=new Scanner(System.in);
String input=scanner.next().trim();
if(!input.isEmpty()&&Character.isDigit(input.charAt(0))){
    int num=Integer.parseInt(input.trim());
    
try{Integer.valueOf(num)};System.out.println("count=" + uniqueNumbers.size()+ "sum="+uniqueNumbers.stream().mapToInt(Integer::intValue).sum());return;}catch(Exception e) {}

scanner2.next(); // 次のトークンをスキップする
} else {
    scanner2.hasNextInt() && Integer.parseInt(scanner2.nextInt()) ? System.out.println("count=0 sum=0") : ""; // 無効な要素は無視する。

}else{
// 数値ではない場合はスキャンを続行する。

Scanner s = new Scanner(System.in); String t = ""; int i; 
try{i=Integer.parseInt(t);}catch(Exception e){}System.out.println("count=0 sum=0"); return;} else {s.nextInt(); System.out.println("count="+uniqueNumbers.size()+ "sum=" + uniqueNumbers.stream().mapToInt(Integer::intValue).sum());}}
