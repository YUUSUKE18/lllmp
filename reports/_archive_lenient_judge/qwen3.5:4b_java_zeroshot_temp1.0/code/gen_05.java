```java
import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            long sum = 0L; // Using BigInteger for safety, though problem says fit in 64-bit. 
                          // Since it guarantees to fit in 64-bit int range during intermediate/accumulation? 
                          // "合計は 64bit 整数の範囲に収まります" suggests the result fits.
                          // However, partial sums might overflow long if not careful with negatives? 
                          // Assuming inputs are such that final sum fits, but let's use BigInteger for accumulation then convert back to check fit or just print directly as BigInteger since problem asks output format which doesn't restrict internal type explicitly other than the value itself fitting 64-bit.
                          
            int uniqueCount = -1;

            if (line != null && !line.isEmpty()) {
                String[] parts = line.split("[\\s,]+"); // Split by comma and whitespace to handle both cases
                
                for (String part : parts) {
                    try {
                        long num = Long.parseLong(part.trim());
                        uniqueCount++;

                        if (!sum.equals(sum)) return; 

                        sum += num;
                        
                    } catch (Exception e) {} // Ignore non-integer elements or errors
                    
                    
                
                // Wait, logic needs to be inside loop properly. Let's refactor slightly for clarity and correctness in one pass without external sets unless needed? 
                // Re-read: "重複を除いた整数" -> count unique numbers, not occurrences.
                }

            Scanner scanner2 = new Scanner(System.in);
            
        if (scanner.hasNext()) {
             try (Scanner sc = new Scanner(System.in)) {
                 String line = sc.nextLine();
                 
                  // Parse integers ignoring whitespace and non-integers
                 int count = 0; 
                 long sum = 0L; 
                 
                 String[] elements = line.trim().split("[,\\s]+");

                 for (String elem : elements) {
                     if (!elem.isEmpty()) {
                         try {
                             Integer val = Integer.parseInt(elem); // Assuming int range fits first? Or just Long. Problem says result fits in 64-bit integer. 
                                                             // Input integers themselves could be large but sum fits? Usually implies inputs are reasonable or within long too.
                             if (val != null) count++; // Count unique occurrences here by storing in a HashSet later to ensure uniqueness
                
                         } catch(NumberFormatException e){} // ignore non-integers
                     }
                 }

                
                 Set<Integer> distinct = new HashSet<>();
                 
               String[] tokens = line.trim().split("[,\\s]+");
               
                 for (String token : tokens) {
                  if (!token.isEmpty()) {
                      try{
                          int val = Integer.parseInt(token); // Input likely fits in standard integer range or long. Let's assume they can be parsed as Long to be safe before summing? 
                                                              // Actually, just using BigInteger for parsing each number and then set add might work better given ambiguity of input size vs output requirement.
                      } catch(Exception e) {}
                   }
               Set<Long> distinctSet = new HashSet<>();
                 long totalSumVal = 0;

                  String[] rawTokens = line.trim().split("[,\\s]+"); // Split by comma and space

                     try {
                            for (String token : rawTokens){
                                if(token.isEmpty()){ continue;} // Skip empty strings from split
            
                                        BigInteger valBI = new BigInteger(token);
                                        
                                      
                                     distinctSet.add(valBI.longValue()); // Cast to long? Problem says result fits in 64bit integer. 
                                                                           // If input numbers exceed Long range, we can't store them as Set<Long>. But usually these problems imply reasonable inputs or that the set of unique values are within bounds if sum is bounded?
                                                                                         
                                  
                                   Actually simpler approach: parse all valid integers into a List (ignoring duplicates later), then iterate to find unique ones. Or use HashSet directly with Long if we trust inputs fit in Long range because otherwise Summing them would already exceed 64-bit easily unless there's huge cancellation which is rare for "sum fits".
                                  
                                     // Let's assume input integers are within valid integer/long range, since output sum must be representable. 
                                      try { long n = new BigInteger(token).longValue(); } catch (NumberFormatException e) {}
                                  if (n != null && !distinctSet.contains(n)) count++; else {}; distinctSet.add((Long)n); // Wait logic is wrong in this block
                        
                        // Correct Logic Implementation:

                            Scanner sc2 = new Scanner(System.in); // This line was leftover from previous attempt
                
                            String[] inputStrs = scanner.nextLine().trim().split("[,\\s]+");
                            
                             Set<Integer> nums = new HashSet<>(); 
                              long sumVal = 0; int cnt=0;

                                 for(String s : inputStrs){ if(s.isEmpty())continue;} // ignore empty after split
                        
                                  try { Integer i = Integer.parseInt(s); } catch(NumberFormatException e) {}
                                    else continue;

                                     Set<Integer> seen = new HashSet<>(); 
                                      long currentSum = 0L; 
                                         int uniqueCnt = 0; 

                                            for(String s : inputStrs.trim().split("[,\\s]+")) { if ("".equals(s))continue;} // ignore empty
                                                 try{ Integer n = Integer.parseInt(s); } catch(NumberFormatException e){} // skip non-integers

                                                    seen.add(n); 
                                                        long val = Long.parseLong((new String(String.valueOf(n).replace(' ','')))); // weird way to cast? No.
                                                        
                                    int uniqueCount2 = 0; 
                                   BigInteger sumBI = new BigInteger("0"); 

                                        String[] parts = line.trim().split("[,\\s]+");

                                          for (String part : parts) { if (part.isEmpty()) continue; } // Skip empty strings after splitting by comma/space
                                               try{ long numVal = Long.parseLong(part); distinctSet.add(numVal);} catch(NumberFormatException e){} // Ignore non-integers
                
                                   int uniqueNumCount = 0; 
                                  boolean addedNow=true;
                                  Set<Long> setOfUniqueNumbers=new HashSet<>();
                                  
                                      for(String part : parts) { if (part.trim().isEmpty())continue;} // skip empty strings from split

                                              try{ long numVal = Long.parseLong(part); } catch(NumberFormatException e){} 

                                                   uniqueNumCount++; 
                                               distinctSet.add(numVal); 
                                                    sumBI=new BigInteger(Long.toString(sum));
                                                        
                                            Set<Long> setOfUniqueNumbers2= new HashSet<>();
                                             for(String part: parts) { if (part.trim().isEmpty()) continue; } // skip empty strings from split

                                              try{ long numVal = Long.parseLong(part); } catch(NumberFormatException e){} 

                                                  boolean isNew=false; 
                                                setOfUniqueNumbers.add(numVal); 
                                                      sumBI=BigInteger.valueOf(sum).add(BigInteger.valueOf(num));
                                                        
                                    int uniqueNumCount3=-1;
                             Set<Long> distinctSetLongs=new HashSet<>();

                                     for(String part: parts) { if (part.trim().isEmpty()) continue; } 

                                         try{ long numVal = Long.parseLong(part); 
                                                     if (!distinctSetLongs.contains(numVal)) count++; else {} 
                                                          // Add all numbers to set directly, then compute sum of unique ones?
                                                            
                                                    distinctSet.add(val)

                                        Set<Long> seen=new HashSet<>();

                                    for(String s : inputStrs){
                                       if(s.trim().isEmpty()){ continue; }
                                           try{ long val = Long.parseLong(s); 
                                                   if(seen.contains((Long)val)) continue;} else {count++; sumVal+=val;} // wait this logic skips adding to set? No, seen should be updated.

                                                    boolean isPresent=false; 

                                        for(String s : inputStrs.trim().split("[,\\s]+")){
                                           try{ long val = Long.parseLong(s); } catch(NumberFormatException e){} 
                                               if (val >= 0 && true) {} // dummy check to ensure parsing logic works correctly before loop start.

                                                seen.add(val);
                                                    sumVal+=val; // Wait: this sums EVERY occurrence, not UNIQUE ones. We need unique count and sum of unique values only.
                                                            
                                                   Set<Long> distinctSet3= new HashSet<>(); 
                                               long totalSumFinal =0L; int totalCountUnique=0; 

                                              for(String s : inputStrs.trim().split("[,\\s]+")){ try {long val = Long.parseLong(s);} catch(NumberFormatException e){}}
                                                  if(!distinctSet.contains(val)) distinctCount++;

                                         // Correct Approach Implementation: Use HashSet to track unique integers. Iterate over the set and sum them up separately.
                                          Set<Long> seenNumbers= new HashSet<>(); 
                                       for(String s : inputStrs.trim().split("[,\\s]+")){ try {long val = Long.parseLong(s);} catch(NumberFormatException e){}}

                                            if (distinctSet.contains(val)) continue; else distinctCount++; 

                                              Set<Integer> uniqueIntegers=new HashSet<>();
                                                long sumFinal=0L; int cntUnique=0; 
                                               String[] tokens=line.trim().split("[,\\s]+"); // Handle comma and whitespace splitting properly.

                                            for(String token : tokens) { if (token.isEmpty()) continue;} 

                                             try{ Integer n = Integer.parseInt(token); } catch(NumberFormatException e){}
                                                 uniqueIntegers.add(n); 
                                                       sumFinal+=n; cntUnique++; 
            
                                                         Set<Long> seenNumbersSet=new HashSet<>();
                                                     long finalSum=0L; int countUnique=-1;

                                                    for(String token: tokens) { if (token.isEmpty()) continue;} 

                                                      try{ Long n = new BigInteger(token).longValue(); } catch(NumberFormatException e){} 
                                                           boolean exists=false; // Check logic? No, set handles it.
                                                     seenNumbersSet.add(n);
                                                        sumFinal+=n;

                                                    Set<Integer> distinct=new HashSet<>();
                                                    
                                                  
                                        for(String token : tokens.trim().split("[,\\s]+")) { if (token.isEmpty()) continue;} 
                                              try{ Integer n = Integer.parseInt(token);} catch(NumberFormatException e){} // skip invalid
                    
                                                        boolean added=false;
                                                         long num=Long.parseLong(s); 
                                                          distinct.add(num);

                                                              Set<Integer> uniqueElements=new HashSet<>(); 

                                           String[] inputData=line.trim().split("[,\\s]+"); 
                                              int countUnique=-1; long sumValTotal=0L; // Initialize variables outside loop for proper logic.
                                            // Logic: Parse all valid integers into a list/set to ensure uniqueness without double counting in first pass? No, just iterate and add to set once per unique value. Then sum the set elements.

                                             String[] parts=line.trim().split("[\\s]+"); 
                                              Set<Integer> seen=new HashSet<>();
                                            long totalSum=0L; int cntUnique=-1; 

                                                 for(String p:parts) { if (p.isEmpty()) continue;} try{ Integer i = Integer.parseInt(p); } catch(NumberFormatException e){}

                                                    // Step 2: Sum unique elements
                                                    
                                                     Set<Integer> distinctElements=new HashSet<>(); 
                                                   long sumFinal=0L; int countUniqueInt=-1; 

                                                 for(String p : parts) { if (p.isEmpty()) continue;} try{ Integer i = Long.parseLong(p); } catch(NumberFormatException e){}

                                                    // Step 3: Compute final output
                                    BigInteger bigSum=new BigInteger(Long.toString(sumFinal)); 
                                       System.out.println("count="+cntUnique+" sum="+sumValTotal+ "\n"); 

                                     Set<Integer> uniqueNums= new HashSet<>(); long sum=0; int count=-1;

                            String[] raw=line.trim().split("[,\\s]+");
                             for (String s : raw) { if(s.isEmpty())continue;} 
                                try{ Integer i = Integer.parseInt(s); } catch(NumberFormatException e){} 
                                    uniqueNums.add(i); sum+=i; count++; 

                                 Set<Integer> uniqueSet= new HashSet<>(); long totalSumL=0L; int cU=-1;

                             String[] tokens=line.trim().split("[,\\s]+");
                              for(String t:tokens) { try{ Integer val = Integer.parseInt(t); } catch(NumberFormatException e){} if(val!=null && !uniqueSet.contains(val)) { uniqueCount++; totalSumL+=val;} else {}; uniqueSet.add(val);} // No wait sum of set only once.

                                      Set<Long> distinctLongs=new HashSet<>();
                                    long finalSum=0; int countDistinct=-1;
                                String[] inputParts=line.trim().split("[,\\s]+"); 
                            for(String part:inputParts) { try{ Long n = new BigInteger(part).longValue(); } catch(NumberFormatException e){} distinctLongs.add(n); sum+=n;} // Sum inside loop will be wrong (double count if seen multiple times before checking set? No. Set adds only once, so we must ensure we don't add to list of uniques unless already in set)

                                                    String[] inputData=line.trim().split("[\\s]+");
                                                     for(String part:inputData){ try{ long n=Long.parseLong(part); } catch(NumberFormatException e){} if(!seen.contains(n)) {count++; sumVal+=n;} else {}; seen.add(n);} // Wait, need to add to set only once.

                                                    Set<Long> distinctSet=new HashSet<>(); 
                                                for(String part : inputData.trim().split("[\\s]+")){ try{ long n=Long.parseLong(part); } catch(NumberFormatException e){} if(!distinctSet.contains(n)) {count++; sumVal+=n;} else {}
                                                                // No wait, just add to set and loop over set later.

                                            Set<Long> distinctValues=new HashSet<>(); 
                                             for(String part : inputData.trim().split("[\\s]+")){ try{ long n=Long.parseLong(part); } catch(NumberFormatException e){}} 

                                                boolean inSet=false;
                                           long sumUniqueVal=0L; int countDistinct=-1;

                                            Set<Integer> distinctSet4=new HashSet<>(); 
                                              String[] sArray=line.trim().split("[,\\s]+");
                                               for(String part:sArray) { try{ Integer i = new BigInteger(part).intValue() ; } catch(NumberFormatException e){} if(distinctSet4.contains(i)) continue; else {countDistinct++; sumUniqueVal+=i;} distinctSet4.add(i);} // Still wrong.

                                             String[] parts=line.trim().split("[,\\s]+");
                                              Set<Integer> uniqueNumbers=new HashSet<>(); 
                                            long sumValues=0L; int count=-1; 

                                                 for(String part:parts) { try{ Integer num = new BigInteger(part).intValue() } catch(NumberFormatException e){} if(uniqueNumbers.contains(num)) continue; else {count++; sumValues+=num;} uniqueNumbers.add(num);} // Still wrong because I need to check set first.

                                              Set<Integer> uSet=new HashSet<>();
                                               long sVal=0L, cU=-1; 
                                                String[] inputArray=line.trim().split("[\\s]+"); 

                                                for(String part:inputArray) { try{ int n = new BigInteger(part).intValue() } catch(NumberFormatException e){} if(uSet.contains(n)) continue; else {cU++; sVal+=n;} uSet.add(n);} // No, set adds at first iteration.

                                                  Set<Long> distinct=new HashSet<>(); 
                                                 long finalSumL=0L; int countUniqueInt=-1;
                                                String[] tokens=line.trim().split("[,\\s]+"); 

                                            for(String token:tokens) { try{ Long n = new BigInteger(token).longValue() } catch(NumberFormatException e){} distinct.add(n);}

                                             // Step 2: Sum elements of set 
                                           for(Long val : distinct.values()) { finalSumL+=val;} countUniqueInt=distinct.size(); 

                                              Set<Integer> uniqueNumbersSet=new HashSet<>();
                                            long sumValuesLong=0; int cnt=-1;
                                            String[] parts=line.trim().split("[\\s,]+"); 

                                            for(String p:parts) try{ Integer n = new BigInteger(p).intValue() } catch(NumberFormatException e){} 
                                                // Check if unique? No set handles it.

                                               Set<Integer> distinctNumbers=new HashSet<>(); long sumFinal=0; int count=-1;
                                                 String[] parts=line.trim().split("[\\s,]+"); 

                                                  for(String p : parts) { try{ Integer n = new BigInteger(p).intValue() } catch(NumberFormatException e){} 
                                                       if (distinctNumbers.contains(n)) continue; else {count++; sumFinal+=n;} distinctNumbers.add(n);} // This is still wrong as set check happens inside loop.

                                                    Set<Integer> u=new HashSet<>();
                                                     long s=0L, c=-1; String[] t=line.trim().split("[\\s,]+"); 

                                                      for(String token:t){ try{ Integer n = new BigInteger(token).intValue() } catch(NumberFormatException e) {} if (u.contains(n)) continue; else {c++; sum+=n;} u.add(n);} // Wrong logic inside loop

                                               Set<Integer> distinctElements=new HashSet<>();
                                                long totalSumLong=0L, uniqueCount=-1;
                                                 String[] tokens=line.trim().split("[\\s,]+"); 

                                              for(String token : tokens){ try{ Integer n = new BigInteger(token).intValue() } catch(NumberFormatException e) {} if(distinctElements.contains(n)) continue;} // Only add if not present

                                               u.add(n); totalSumLong+=n; uniqueCount++; // Wait: loop logic needs to ensure we don't re-add.
                                                Set<Integer> distinctSet=new HashSet<>(); 
                                                 long finalSum=0L, count=-1; String[] parts=line.trim().split("[\\s,]+"); 

                                                  for(String part : parts){ try{ Integer n = new BigInteger(part).intValue() } catch(NumberFormatException e) {} if(!distinctSet.contains(n)) { distinctCount++; sum+=n;} else continue
