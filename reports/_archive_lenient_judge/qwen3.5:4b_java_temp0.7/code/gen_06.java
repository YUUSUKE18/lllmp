```java
import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成 (BigInteger で扱うため)
        BigInteger sum = BigInteger.ZERO;
        
        while (scanner.hasNext()) {
            String token = "";
            
            // カーソルを空白スキップして次の文字列を取得
            if (scanner.hasNextInt() || scanner.next().matches("-?[0-9]+")) {
                try {
                    // 入力ストリームの現在の位置が整数の開始地点ではない場合、次へ進める
                    int cursor = Integer.MAX_VALUE; 
                    
                    while (true) {
                        char c = System.in.read();
                        
                        if (c == '\n' || c == ' ') {
                            break; // 改行または空白で区切りとみなす
                        } else if (!Character.isWhitespace(c)) {
                            cursor--; // カーソルを先頭にリセットし、文字列を取得する準備をする
                        
                            token = ""; // トークンを初期化して再取得
                    
                        
                            while (c != '\n' && c != ' ') {
                                String s;
                                
                                if (!Character.isWhitespace(c)) {
                                    try {
                                        int value = Integer.parseInt(token);
                                        
                                        sum.add(BigInteger.valueOf(value));
                                    
                                            // トークンを更新し、次の文字を取得する準備をする
                                            cursor--; 
                                            
                                            token += c;
                        
                                                while (scanner.hasNext()) {
                                                    String nextToken = scanner.next();
                                                    
                                                     if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                                            
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
                                    
                                                                     cursor--; 
                                                                     
                                                                                 token += c;
                     
                                                                             while (scanner.hasNext()) {
                                                                                 String nextToken2 = scanner.next();
                                                                                                                                 if (!Character.isWhitespace(nextToken2.charAt(0))) {
                                                                                                                                     try {
                                                                                                                                         int val = Integer.parseInt(token);
                                                                                                                                             sum.add(BigInteger.valueOf(val));
                                                                             
                                                                                                                                                 cursor--; 
                                                                                                                                     
                                                                                                                                                     token += c;
                 
                                                             } catch (NumberFormatException e) {} // 整数として解釈できない要素は無視する
     
                                                            
                                                     } else if (!Character.isWhitespace(nextToken.charAt(0))) {
                                                         try {
                                                             int val = Integer.parseInt(token);
                                                                 sum.add(BigInteger.valueOf(val));
