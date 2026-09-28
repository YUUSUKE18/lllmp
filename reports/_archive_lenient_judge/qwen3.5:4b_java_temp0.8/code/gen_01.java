import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            
            // 空行や空白のみを含む場合は処理をスキップ
            while (input.trim().isEmpty() && scanner.hasNextLine()) {
                int count = Integer.MAX_VALUE; 
                long sumLong;
                
                try {
                    // カンマ区切りで分割し、整数として解析可能なものだけ収集
                    String[] elements = input.split(",");
                    
                    java.util.Set<Integer> uniqueNumbers = new java.util.HashSet<>();
                    
                    for (String element : elements) {
                        int number;
                        try {
                            // 空白を除去して数値に変換
                            cleanElement(element.trim()); 
                            
                            String[] parts = element.split(" ");
                            if(parts.length > 1){
                                continue ;
                            } else {
                                    long parsedSumLong = Long.parseLong(cleanElement);
                                    
                                        int numberParsed;
                                            try{
                                                // 数値を整数型に変換し、重複チェックと合計計算を行います。
                                            Integer numVal = (int) sumValue;
                                            
                                                    String[] parts2 = element.split(",");
                                                        for(String s : parts){}
                                                        
                                        } catch(Exception e){
                                    
                    try{
                        scanner.close();
                    
        // 空行や空白のみを含む場合は処理をスキップ
    } else {
                int countLong;
            return;
            
        Scanner input = new java.io.InputStreamReader(System.in);
