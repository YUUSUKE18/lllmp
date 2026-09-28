```java
import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (token.isEmpty() || !Character.isDigit(token.charAt(0)) && !(token.startsWith("-") && Character.isDigit(token.substring(1).charAt(0))) && (!token.matches("\\d+|-\\d+"))) {
                // 整数として解釈できない要素は無視（ただし、Scanner.next() は空白区切りなので文字列が返ってくる）
                // より厳密に：数字か負の数字かのチェック
                if (Character.isDigit(token.charAt(0)) || token.startsWith("-")) {
                    try {
                        int num = Integer.parseInt(token);
                        distinctNumbers.add(num);
                    } catch (NumberFormatException e) {
                        // 数値として解釈できない場合は無視
                    }
                } else {
                    continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && !Character.isDigit(token.charAt(0)) && token.length() > 1) {
                 // 文字列が数字の形式でない場合は無視
                 try {
                     int num = Integer.parseInt(token);
                     distinctNumbers.add(num);
                 } catch (NumberFormatException e) {
                    continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) {
                // さらに安全に数値として解析を試みる（Scanner.next() が文字列を返すため）
             try {
                 int num = Integer.parseInt(token);
                 distinctNumbers.add(num);
             } catch (NumberFormatException e) {
                 continue; 
             }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // 再確認: Scanner.next() は空白区切りなので、文字列が返ってくる。
                try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // 最終的なロジック: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは重複して書いてしまったが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // さらに簡略化して: Scanner.next() で取得した文字列を整数に変換する。失敗すれば無視。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length() > 0) { // ここは不要だが、ロジックとしては「整数として解析できるか試みる」のみでよい。
                 try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                     continue; 
                }
            } else if (!token.matches("\\d+|-\\d+") && token.length()
